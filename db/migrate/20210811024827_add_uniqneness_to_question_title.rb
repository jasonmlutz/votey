class AddUniqnenessToQuestionTitle < ActiveRecord::Migration[6.0]
  def change
    add_index :questions, [:title, :parent_poll_id], unique: true
  end
end
