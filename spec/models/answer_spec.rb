# == Schema Information
#
# Table name: answers
#
#  id                 :bigint           not null, primary key
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  question_id        :integer          not null
#  response_id        :integer          not null
#  response_option_id :integer          not null
#
require 'rails_helper'

RSpec.describe Answer, type: :model do
  it { should validate_presence_of(:question_id)}
  it { should validate_presence_of(:response_id)}
  it { should validate_presence_of(:response_option_id)}

  it { should belong_to(:question).with_foreign_key(:question_id)}
  it { should belong_to(:response).with_foreign_key(:response_id)}
  it { should belong_to(:response_option).with_foreign_key(:response_option_id)}
end
