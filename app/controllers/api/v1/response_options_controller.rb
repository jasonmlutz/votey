class Api::V1::ResponseOptionsController < ApplicationController
  before_action :set_question, only: [:index, :create]

  # GET /response_options
  # GET /response_options.json
  def index
    @response_options = @question.response_options.order(id: :asc)
    render json: @response_options
  end

  def create
    @response_option = ResponseOption.new(response_option_params)
    @response_option.parent_question_id = @question.id

    if @response_option.save
      render json: @response_option
    else
      render json: @response_option.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    def response_option_params
      params.permit(:text)
    end
    
    def set_question
      @question = Question.find(params[:question_id])
    end
end
