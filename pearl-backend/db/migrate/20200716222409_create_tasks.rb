class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :task
      t.string :description
      t.string :destination
      t.integer :user_id

      t.timestamps
    end
  end
end
