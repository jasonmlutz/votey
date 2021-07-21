class Api::V1::ResponseOptionsController < ApplicationController
  before_action :set_question, only: [:index]

  # GET /response_options
  # GET /response_options.json
  def index
    @response_options = @question.response_options.order(id: :asc)
    render json: @response_options
  end

  private
    def set_question
      @question = Question.find(params[:question_id])
    end
end
