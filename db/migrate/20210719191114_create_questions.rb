class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.integer :parent_poll_id, null: false
      t.string :title, null: false
      t.string :question_type, null: false, default: ":RADIO"
      t.boolean :required, default: true
      
      t.timestamps
    end
  end
end
