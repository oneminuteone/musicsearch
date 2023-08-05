FactoryBot.define do
  factory :favourite do
      leading_thumbnail_url { Faker::Internet.url }
      title { Faker::Music.album }
      subtitle { Faker::Music.band }
  end
end
