require "rails_helper"

RSpec.describe Task, type: :model do
  let(:team) { create(:team) }
  let(:user) { create(:user, team:) }

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

  context "ユーザーと紐付いていない時" do
    let(:task) { build(:task) }

    it "バリデーションエラーが発生すること" do
      task.valid?
      expect(task.errors).to be_of_kind(:user, :blank)
    end
  end
end
