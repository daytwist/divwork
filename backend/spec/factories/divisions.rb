FactoryBot.define do
  factory :division do
    comment { Faker::Books::Lovecraft.sentence(word_count: 1) }
  end
end
