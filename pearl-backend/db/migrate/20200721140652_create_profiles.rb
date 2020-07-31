class CreateProfiles < ActiveRecord::Migration[6.0]
  def change
    create_table :profiles do |t|
      t.string :picture_url
      t.string :bio
      t.string :name
      t.integer :age
      t.string :hobbies
      t.string :location
      t.string :to_know
      t.integer :phone_number
      t.integer :user_id

      t.timestamps
    end
  end
end
