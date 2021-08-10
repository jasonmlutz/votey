class Api::V1::QuestionsController < ApplicationController
  before_action :set_poll, only: [:index, :create]

  # GET /questions
  # GET /questions.json
  def index
    @questions = @poll.questions.order(id: :asc)
    render json: @questions
  end

  def create
    @question = Question.new(question_params)
    @question.parent_poll_id = @poll.id

    if @question.save
      render json: @question
    else
      render json: @question.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
    def question_params
      params.permit(:title)
    end
    def set_poll
      @poll = Poll.find(params[:poll_id])
    end
end
