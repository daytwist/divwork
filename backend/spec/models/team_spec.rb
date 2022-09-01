require "rails_helper"

RSpec.describe Team, type: :model do
  context "チーム名を指定しない時" do
    let(:team) { build(:team, name: nil) }

    it "バリデーションエラーが発生すること" do
      team.valid?
      expect(team.errors).to be_of_kind(:name, :blank)
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
