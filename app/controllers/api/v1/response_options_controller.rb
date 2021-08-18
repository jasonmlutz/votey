class Api::V1::ResponseOptionsController < ApplicationController
  before_action :set_question, only: [:index, :create]
  before_action :set_response_option, only: [:destroy]

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

  def destroy
    if @response_option && @response_option.destroy
      render json: {message: "response option deleted"}
    else
      render json: {message: "destroy not successful"}
    end
  end

  private
    def response_option_params
      params.permit(:text)
    end
    
    def set_question
      @question = Question.find(params[:question_id])
    end

    def set_response_option
      @response_option = ResponseOption.find_by(id: params[:id])
    end
end
