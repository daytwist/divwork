2.times do |n|
  team = Team.create!(
    name: Faker::Team.name
  )

  4.times do |m|
    team.users.create!(
      name: Faker::Name.name,
      email: Faker::Internet.unique.email,
      password: "password",
    )
  end
end
