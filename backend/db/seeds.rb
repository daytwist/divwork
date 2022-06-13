2.times do |n|
  team = Team.create!(
    name: Faker::Team.name
  )

  4.times do |m|
    user = team.users.create!(
      name: Faker::Name.name,
      email: Faker::Internet.unique.email,
      password: "password",
    )

    3.times do |l|
      user.tasks.create!(
        title: Faker::Job.title,
        description: Faker::Books::Lovecraft.sentence,
        deadline: Faker::Time.between(from: DateTime.now, to: DateTime.now + 7, format: :long),
        priority: rand(0..2),
        is_done: false
      )
    end
  end
end
