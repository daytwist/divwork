require "rails_helper"

RSpec.describe Team, type: :model do
  context "チーム名を指定しない時" do
    let(:team) { build(:team, name: nil) }

    it "バリデーションエラーが発生すること" do
      team.valid?
      expect(team.errors).to be_of_kind(:name, :blank)
    end
  end
end
