require "rails_helper"

RSpec.describe Task, type: :model do
  let(:team) { create(:team) }
  let(:user) { create(:user, team:) }

  describe "validation" do
    context "全てのカラムを適切に入力した時" do
      let(:task) { build(:task, user:) }

      it "バリデーションエラーが発生しないこと" do
        expect(task).to be_valid
      end
    end

    context "タイトルを入力しない時" do
      let(:task) { build(:task, title: nil, user:) }

      it "バリデーションエラーが発生すること" do
        task.valid?
        expect(task.errors).to be_of_kind(:title, :blank)
      end
    end

    context "納期を入力しない時" do
      let(:task) { build(:task, deadline: nil, user:) }

      it "バリデーションエラーが発生すること" do
        task.valid?
        expect(task.errors).to be_of_kind(:deadline, :blank)
      end
    end

    context "優先度を入力しない時" do
      let(:task) { build(:task, priority: nil, user:) }

      it "バリデーションエラーが発生すること" do
        task.valid?
        expect(task.errors).to be_of_kind(:priority, :inclusion)
      end
    end

    context "完了済みフラグを入力しない時" do
      let(:task) { build(:task, is_done: nil, user:) }

      it "バリデーションエラーが発生すること" do
        task.valid?
        expect(task.errors).to be_of_kind(:is_done, :inclusion)
      end
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

    context "ユーザーと紐付いていない時" do
      let(:task) { build(:task) }

      it "バリデーションエラーが発生すること" do
        task.valid?
        expect(task.errors).to be_of_kind(:user, :blank)
      end
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
