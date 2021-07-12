class AddOwnerToFacilities < ActiveRecord::Migration[6.0]
  def change
    add_foreign_key :facilities, :users, name: :owner_id, column: :id
  end
end
