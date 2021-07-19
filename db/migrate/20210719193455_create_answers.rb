class CreateAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :answers do |t|
      t.integer :response_id, null: false
      t.integer :question_id, null: false
      t.integer :response_option_id, null: false
      
      t.timestamps
    end
  end
end
