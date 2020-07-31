class CreatePending < ActiveRecord::Migration[6.0]
  def change
    create_table :pendings do |t|
      t.integer :task_id
      t.integer :volunteer_id
      t.integer :senior_id

      t.timestamps
    end
  end
end
