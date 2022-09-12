require "rails_helper"

RSpec.describe Team, type: :model do
  describe "validation" do
    it "チーム名を入力しないとバリデーションエラーが発生すること" do
      team = build(:team, name: nil)
      team.valid?
      expect(team.errors).to be_of_kind(:name, :blank)
    end

    it "上限人数が1より小さいとバリデーションエラーが発生すること" do
      team = build(:team, max_num_of_users: 0)
      team.valid?
      expect(team.errors).to be_of_kind(:max_num_of_users, :greater_than_or_equal_to)
    end

    it "上限人数が20より大きいとバリデーションエラーが発生すること" do
      team = build(:team, max_num_of_users: 21)
      team.valid?
      expect(team.errors).to be_of_kind(:max_num_of_users, :less_than_or_equal_to)
    end

    it "上限人数が小数だとバリデーションエラーが発生すること" do
      team = build(:team, max_num_of_users: 10.5)
      team.valid?
      expect(team.errors).to be_of_kind(:max_num_of_users, :not_an_integer)
    end
  end

  describe "admin_users method" do
    let(:team) { create(:team) }
    let!(:user_admin) { create(:user, team:, admin: true) }
    let!(:user_normal) { create(:user, team:) }

    it "管理者ユーザーを抽出出来ること" do
      expect(team.admin_users).to include(user_admin)
    end

    it "一般ユーザーが含まれていないこと" do
      expect(team.admin_users).not_to include(user_normal)
    end
  end
end
