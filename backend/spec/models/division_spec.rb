require "rails_helper"

RSpec.describe Division, type: :model do
  let(:team) { create(:team) }
  let(:user) { create(:user, team:) }
  let(:task) { create(:task, user:) }

  context "全てのカラムを適切に入力した時" do
    let(:division) { build(:division, user:, task:) }

    it "バリデーションエラーが発生しないこと" do
      expect(division).to be_valid
    end
  end

  context "ユーザーとタスクを指定しない時" do
    let(:division) { build(:division) }

    it "バリデーションエラーが発生すること" do
      division.valid?
      expect(division.errors).to be_of_kind(:user, :blank) &&
                                 be_of_kind(:task, :blank)
    end
  end
end
