require "rails_helper"

RSpec.describe User, type: :model do
  describe "ユーザー新規作成機能" do
    let(:team) { create(:team) }

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
end
