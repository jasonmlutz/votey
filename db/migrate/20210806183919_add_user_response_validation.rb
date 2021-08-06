class AddUserResponseValidation < ActiveRecord::Migration[6.0]
  def change
    add_index :responses, [:poll_id, :respondent_id], unique: true
  end
end
