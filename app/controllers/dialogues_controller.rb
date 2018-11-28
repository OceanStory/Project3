class DialoguesController < ApplicationController
  def index
    @dialogues = Dialogue.all
  end

  def show
    @dialouge = Dialogue.find_by(id: params[:id])
  end

  def new
    @dialogue = Dialogue.new
  end

  def create
    dialogue = Dialogue.create dialogue_params
    redirect_to dialogues_path(dialogue)
  end

  def edit
    @dialogue = Dialogue.find_by(id: params[:id])
  end

  def update
    dialogue = Dialogue.find_by(id: params[:id])
    dialogue.update(dialogue_params)
    redirect_to dialogues_path
  end

  def destroy
    @dialogue = Dialogue.find(params[:id])
    @dialogue.destroy
    redirect_to dialogues_path
  end

  private

  def dialogue_params
    params.require(:dialogue).permit(:content)
  end
end
