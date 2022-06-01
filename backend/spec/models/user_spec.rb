require "rails_helper"

RSpec.describe User, type: :model do
  context "name, email, passwordを指定する時" do
    let(:user) { build(:user) }

    it "バリデーションエラーが発生しないこと" do
      expect(user).to be_valid
    end
  end

  context "emailを指定しない時" do
    let(:user) { build(:user, email: nil) }

    it "エラーが発生すること" do
      user.valid?
      expect(user.errors.messages[:email]).to include "can't be blank"
    end
  end

  context "passwordを指定しない時" do
    let(:user) { build(:user, password: nil) }

    it "エラーが発生すること" do
      user.valid?
      expect(user.errors.messages[:password]).to include "can't be blank"
    end
  end

  context "既に登録されているemailを指定する時" do
    let(:user1) { create(:user) }
    let(:user2) { build(:user, email: user1.email) }

    it "エラーが発生すること" do
      user2.valid?
      expect(user2.errors.messages[:email]).to include "has already been taken"
    end
  end
end
