require "rails_helper"

RSpec.describe Division, type: :model do
  let(:team) { create(:team) }
  let(:user) { create(:user, team:) }
  let(:task) { create(:task, user:) }

  describe "validation" do
    it "全てのカラムを適切に入力するとバリデーションエラーが発生しないこと" do
      division = build(:division, user:, task:)
      expect(division).to be_valid
    end

    it "ユーザーとタスクを指定しないとバリデーションエラーが発生すること" do
      division = build(:division)
      division.valid?
      expect(division.errors).to be_of_kind(:user, :blank) &&
                                 be_of_kind(:task, :blank)
    end
  end

  describe "parent_user, parent_task, child_user, child_task method" do
    let(:another_user) { create(:user, team:) }
    let(:child_task) { create(:task, user: another_user, parent_id: task.id) }
    let!(:division) { create(:division, user:, task: child_task) }

    it "親タスクの情報を取得出来ること" do
      expect(division.parent_user.id).to eq user.id
      expect(division.parent_task.id).to eq task.id
    end

    it "子タスクの情報を取得出来ること" do
      expect(division.child_user.id).to eq another_user.id
      expect(division.child_task.id).to eq child_task.id
    end
  end
end
