FactoryBot.define do
  factory :task do
    title { Faker::Job.title }
    content { Faker::Books::Lovecraft.sentence }
    deadline { Faker::Time.between(from: DateTime.now, to: DateTime.now + 7, format: :long) }
    priority { rand(0..2) }
    is_done { false }
  end
end
