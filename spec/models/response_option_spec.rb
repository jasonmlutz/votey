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
require 'rails_helper'

RSpec.describe ResponseOption, type: :model do
  it { should validate_presence_of(:text) }
  it { should validate_presence_of(:parent_question_id) }

  it { should belong_to(:question).with_foreign_key(:parent_question_id)}
  it { should have_many(:answers).with_foreign_key(:response_option_id)}
end
