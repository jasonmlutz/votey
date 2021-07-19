class CreateResponseOptions < ActiveRecord::Migration[6.0]
  def change
    create_table :response_options do |t|
      t.integer :parent_question_id, null: false
      t.string :text, null: false
      
      t.timestamps
    end
  end
end
