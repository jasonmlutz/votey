class AddAnswerUniquenessScopedQuestionId < ActiveRecord::Migration[6.0]
  def change
    add_index :answers, [:response_id, :question_id], unique: true
  end
end
