class Favourite < ApplicationRecord
    validates :leading_thumbnail_url, presence: true
    validates :title, presence: true
    validates :subtitle, presence: true

    validates :title, uniqueness: { scope: :subtitle }
end
