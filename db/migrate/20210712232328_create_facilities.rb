class CreateFacilities < ActiveRecord::Migration[6.0]
  def change
    create_table :facilities do |t|
      t.string :address, null: false
      t.string :name, null: false
      t.text :description, null: false

      t.timestamps
    end
  end
end
