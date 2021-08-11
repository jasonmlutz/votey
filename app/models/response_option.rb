# == Schema Information
#
# Table name: response_options
#
#  id                 :bigint           not null, primary key
#  text               :string           not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  parent_question_id :integer          not null
#
# Indexes
#
#  index_response_options_on_text_and_parent_question_id  (text,parent_question_id) UNIQUE
#
class ResponseOption < ApplicationRecord
  validates :text, :parent_question_id, presence: true
  validates :text, uniqueness: {scope: :parent_question_id}


  belongs_to :question, foreign_key: :parent_question_id
  has_many :answers, foreign_key: :response_option_id, dependent: :destroy
end
