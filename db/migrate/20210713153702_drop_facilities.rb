class DropFacilities < ActiveRecord::Migration[6.0]
  def change
    drop_table :facilities
  end
end
