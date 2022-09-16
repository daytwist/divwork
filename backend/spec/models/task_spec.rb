require "rails_helper"

RSpec.describe Task, type: :model do
  let(:team) { create(:team) }
  let(:user) { create(:user, team:) }

  describe "validation" do
    it "全てのカラムを入力するとバリデーションエラーが発生しないこと" do
      task = build(:task, user:)
      expect(task).to be_valid
    end

    it "タイトルを入力しないとバリデーションエラーが発生すること" do
      task = build(:task, title: nil, user:)
      task.valid?
      expect(task.errors).to be_of_kind(:title, :blank)
    end

    it "納期を入力しないとバリデーションエラーが発生すること" do
      task = build(:task, deadline: nil, user:)
      task.valid?
      expect(task.errors).to be_of_kind(:deadline, :blank)
    end

    it "優先度を入力しないとバリデーションエラーが発生すること" do
      task = build(:task, priority: nil, user:)
      task.valid?
      expect(task.errors).to be_of_kind(:priority, :inclusion)
    end

    it "完了済みフラグを入力しないとバリデーションエラーが発生すること" do
      task = build(:task, is_done: nil, user:)
      task.valid?
      expect(task.errors).to be_of_kind(:is_done, :inclusion)
    end

    it "進捗率が0より小さいとバリデーションエラーが発生すること" do
      task = build(:task, rate_of_progress: -1, user:)
      task.valid?
      expect(task.errors).to be_of_kind(:rate_of_progress, :greater_than_or_equal_to)
    end

    it "進捗率が100より大きいとバリデーションエラーが発生すること" do
      task = build(:task, rate_of_progress: 101, user:)
      task.valid?
      expect(task.errors).to be_of_kind(:rate_of_progress, :less_than_or_equal_to)
    end

    it "進捗率が小数だとバリデーションエラーが発生すること" do
      task = build(:task, rate_of_progress: 50.5, user:)
      task.valid?
      expect(task.errors).to be_of_kind(:rate_of_progress, :not_an_integer)
    end

    it "ユーザーと紐付いていないとバリデーションエラーが発生すること" do
      task = build(:task)
      task.valid?
      expect(task.errors).to be_of_kind(:user, :blank)
    end
  end

  describe "scope unfinished/finished" do
    let!(:unfinished_task) { create(:task, is_done: false, user:) }
    let!(:finished_task) { create(:task, is_done: true, user:) }

    it "未了タスクを抽出すること" do
      tasks = user.tasks.unfinished
      expect(tasks).to include(unfinished_task)
      expect(tasks).not_to include(finished_task)
    end

    it "完了済みタスクを抽出すること" do
      tasks = user.tasks.finished
      expect(tasks).to include(finished_task)
      expect(tasks).not_to include(unfinished_task)
    end
  end

  describe "scope deadline" do
    let!(:task_long) { create(:task, user:, deadline: Time.zone.today.advance(days: 9)) }
    let!(:task_middle_a) { create(:task, user:, deadline: Time.zone.today.advance(days: 8)) }
    let!(:task_middle_b) { create(:task, user:, deadline: Time.zone.today.advance(days: 5)) }
    let!(:task_short) { create(:task, user:, deadline: Time.zone.today.advance(days: 4)) }

    it "納期が1週間以上後の未完了タスクを抽出出来ること" do
      expect(user.tasks.deadline_long).to include(task_long)
      expect(user.tasks.deadline_long).not_to include(task_middle_a)
    end

    it "納期が4日後〜1週間後の未完了タスクを抽出出来ること" do
      expect(user.tasks.deadline_middle).to include(task_middle_a, task_middle_b)
      expect(user.tasks.deadline_middle).not_to include(task_short)
    end

    it "納期が3日以内の未完了タスクを抽出出来ること" do
      expect(user.tasks.deadline_short).to include(task_short)
      expect(user.tasks.deadline_short).not_to include(task_middle_b)
    end
  end

  describe "parent-children relationship" do
    let(:parent_task) { create(:task, user:) }
    let(:child_task) { create(:task, user:, parent_id: parent_task.id) }

    it "子タスクから親タスクを取得出来ること" do
      expect(child_task.parent).to eq parent_task
    end

    it "親タスクから子タスクを取得出来ること" do
      expect(parent_task.children).to include(child_task)
    end
  end

  describe "Upload files" do
    let(:task) { create(:task, user:, files: [fixture_file_upload("file.txt", "text/txt")]) }

    it "ファイルがアップロードされていること" do
      expect(task.files).to be_attached
    end
  end
end
