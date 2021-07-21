class Api::V1::QuestionsController < ApplicationController
  before_action :set_poll, only: [:index]

  # GET /questions
  # GET /questions.json
  def index
    @questions = @poll.questions.order(id: :asc)
    render json: @questions
  end

  private
    def set_poll
      @poll = Poll.find(params[:poll_id])
    end
end
