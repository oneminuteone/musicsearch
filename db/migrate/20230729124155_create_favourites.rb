class CreateFavourites < ActiveRecord::Migration[7.0]
  def change
    create_table :favourites do |t|
      t.string :leading_thumbnail_url, null: false
      t.string :title, null: false
      t.string :subtitle, null: false

      t.timestamps
    end

    add_index :favourites, [:title, :subtitle], unique: true
  end
end
