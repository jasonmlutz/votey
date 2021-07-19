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
class ResponseOption < ApplicationRecord
  validates :text, :parent_question_id, presence: true

  belongs_to :question, foreign_key: :parent_question_id
  has_many :answers, foreign_key: :response_option_id, dependent: :destroy
end
