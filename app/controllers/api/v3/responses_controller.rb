class Api::V3::ResponsesController < ApplicationController
  before_action :set_response, only: [:show]

  # GET /responses/:id
  def show
    if @response
      # render json: @response
      render json: build_catalog(@response)
    else
      render json: {}
    end
  end

  private
    def build_catalog(response)
      catalog = {}
      catalog[:RESPONDENT] = response.respondent.protect
      catalog[:ANSWERS] = {}
      response.answers.each do |answer|
        response_option = answer.response_option
        catalog[:ANSWERS][answer.question_id] = response_option
      end

      poll = response.poll
      catalog[:POLL] = poll
      catalog[:AUTHOR] = poll.author.protect
      catalog[:QUESTIONS] = poll.questions
      catalog[:RESPONSE_OPTIONS] = {}
      poll.questions.each do |question|
        response_options = question.response_options
        catalog[:RESPONSE_OPTIONS][question.id] = response_options
      end

      catalog[:RESPONDENTS] = {}
      poll.responses.each do |response|
        respondent = response.respondent
        catalog[:RESPONDENTS][response.id] = respondent.protect
      end

      return catalog
    end

    def set_response
      @response = Response.find_by(id: params[:id])
    end
end