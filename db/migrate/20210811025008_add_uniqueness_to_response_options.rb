class AddUniquenessToResponseOptions < ActiveRecord::Migration[6.0]
  def change
    add_index :response_options, [:text, :parent_question_id], unique: true
  end
end
