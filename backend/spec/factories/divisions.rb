FactoryBot.define do
  factory :division do
    comment { Faker::Books::Lovecraft.sentence }
  end
end
