class Api::V1::ResponsesController < ApplicationController
  before_action :set_response, only: [:show, :destroy]

  # GET /responses/:id
  def show
    if @response
      # render json: @response
      render json: build_catalog(@response)
    else
      render json: {}
    end
  end

  # POST /responses
  # POST /responses.json
  def create
    @response = Response.new(response_params)

    if @response.save
      render json: @response
    else
      render json: @response.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    if @response && @response.destroy
      render json: {message: "response object destroyed"}
    else
      render json: {message: "response object NOT destroyed"}
    end
  end

  private
    def build_catalog(response)
      catalog = {}
      catalog[:RESPONSE] = response
      catalog[:RESPONDENT] = response.respondent.protect
      catalog[:ANSWERS] = {}
      response.answers.each do |answer|
        response_option = answer.response_option
        catalog[:ANSWERS][answer.question_id] = response_option
      end
      return catalog
    end

    def response_params
      params.permit(:respondent_id, :poll_id)
    end

    def set_response
      @response = Response.find_by(id: params[:id])
    end
end
