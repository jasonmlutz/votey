# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  admin           :boolean          default(FALSE)
#  password_digest :string
#  session_token   :string           not null
#  username        :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require_relative '../rails_helper'

RSpec.describe User, type: :model do
  subject(:user) do
    FactoryBot.build(:user)
    end

    it { should validate_presence_of(:username)}
    it { should validate_presence_of(:password_digest)}
    it { should validate_presence_of(:session_token)}
    it { should validate_uniqueness_of(:username)}
    it { should validate_length_of(:password).is_at_least(6) }

    it {should have_many(:polls).with_foreign_key(:author_id)}

    describe '#is_password?' do
      it 'identifies a correct password' do
        expect(user.is_password?(user.password)).to be true
      end
      it 'identifies an incorrect password' do
        expect(user.is_password?('incorrect_password')).to be false
      end
    end

    describe '##find_by_credentials' do
      it 'retrives the user object with correct credentials' do
        user.save!
        expect(User.find_by_credentials(user.username, user.password)).to eq(user)
      end
      it 'returns +nil+ if no such email exists' do
        expect(User.find_by_credentials('invalidName', 'good_password')).to be false
      end
      it 'returns +nil+ if email exists but password is incorrect' do
        expect(User.find_by_credentials(user.username, 'incorrect_password')).to be false
      end
    end

    describe '#reset_session_token!' do
      it 'sets a session token as a string' do
        user.reset_session_token!
        expect(user.session_token).to be_a(String)
      end
      it 'sets a session token to be a non-empty string' do
        user.reset_session_token!
        expect(user.session_token.length).to be > 0
      end
      it '*almost always* sets a new session token' do
        @initial_session_token = user.session_token
        user.reset_session_token!
        expect(user.session_token).not_to eq(@initial_session_token)
      end
    end
end
