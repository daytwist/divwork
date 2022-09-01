FactoryBot.define do
  factory :team do
    name { Faker::Team.name }
    max_num_of_users { 10 }
  end
end
