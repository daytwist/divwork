require "rails_helper"

RSpec.describe User, type: :model do
  let(:team) { create(:team) }

  describe "ユーザー新規作成機能" do
    context "name, email, password, teamを指定する時" do
      let(:user) { build(:user, team:) }

      it "バリデーションエラーが発生しないこと" do
        expect(user).to be_valid
      end
    end

    context "ユーザー名を指定しない時" do
      let(:user) { build(:user, name: nil, team:) }

      it "バリデーションエラーが発生すること" do
        user.valid?
        expect(user.errors).to be_of_kind(:name, :blank)
      end
    end

    context "emailを指定しない時" do
      let(:user) { build(:user, email: nil, team:) }

      it "バリデーションエラーが発生すること" do
        user.valid?
        expect(user.errors).to be_of_kind(:email, :blank)
      end
    end

    context "passwordを指定しない時" do
      let(:user) { build(:user, password: nil, team:) }

      it "バリデーションエラーが発生すること" do
        user.valid?
        expect(user.errors).to be_of_kind(:password, :blank)
      end
    end

    context "チームを指定しない時" do
      let(:user) { build(:user) }

      it "バリデーションエラーが発生すること" do
        user.valid?
        expect(user.errors).to be_of_kind(:team, :blank)
      end
    end

    context "既に登録されているemailを指定する時" do
      let(:user1) { create(:user, team:) }
      let(:user2) { build(:user, email: user1.email, team:) }

      it "バリデーションエラーが発生すること" do
        user2.valid?
        expect(user2.errors).to be_of_kind(:email, :taken)
      end
    end
  end

  describe "tasks_count method" do
    let(:user) { create(:user, team:) }
    let!(:task_a) { create(:task, user:, priority: 0) }
    let!(:task_b) { create(:task, user:, priority: 0) }
    let!(:task_c) { create(:task, user:, priority: 1) }
    # priority:0が2個、priority:1が1個、priority:2が0個

    it "タスクの優先度毎にカウント出来ること" do
      expect(user.tasks_count).to eq [2, 1, 0]
    end
  end

  describe "guest method" do
    it "ゲストユーザーを作成出来ること" do
      user = described_class.guest
      expect(user.name).to eq "ゲスト"
      expect(user.email).to eq "guest@example.com"
    end
  end

  describe "team_members method" do
    let!(:user_a) { create(:user, team:) }
    let!(:user_b) { create(:user, team:) }

    it "チームメンバーはuser_bであること" do
      expect(user_a.team_members.first).to eq user_b
    end

    it "チームメンバーにuser_aが含まれないこと" do
      expect(user_a.team_members).not_to include(user_a)
    end
  end
end
