# == Schema Information
#
# Table name: questions
#
#  id             :bigint           not null, primary key
#  question_type  :string           default(":RADIO"), not null
#  required       :boolean          default(TRUE)
#  title          :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  parent_poll_id :integer          not null
#
# Indexes
#
#  index_questions_on_title_and_parent_poll_id  (title,parent_poll_id) UNIQUE
#
require 'rails_helper'

RSpec.describe Question, type: :model do
  it { should validate_presence_of(:question_type) }
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:parent_poll_id) }

  it { should belong_to(:poll).with_foreign_key(:parent_poll_id)}
  it { should have_many(:response_options).with_foreign_key(:parent_question_id)}
  it { should have_many(:answers).with_foreign_key(:question_id)}
end
