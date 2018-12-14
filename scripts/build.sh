#!/bin/bash

source ./scripts/config.sh
source ./scripts/messages.sh

branch_checkout() {
  local branch=feature/${PREFIX}${WIDGET}
  git fetch origin
  if [[ $(git branch --list ${branch}) ]]; then
    echo -e "${BLUE}${BRANCH_SWITCH_MSG}${RESET}"
    git checkout ${branch}
  else
    echo -e "${BLUE}${BRANCH_CREATE_MSG}${RESET}"
    git checkout -b ${branch} origin/master
  fi
}

create_base_dir() {
  echo -e "${BLUE}${SCAFFOLD_MSG}${RESET}"
  make_core_dir ${SRC_DIR}
  make_core_dir ${PREFIX}${WIDGET}
  mkdir ${IMAGE_DIR}
  curl ${CONFIG_GIST} > config.json
  curl ${README_GIST} > README.md
  touch ${PREFIX}${WIDGET}.${UPDATE_SET}
}

create_controller() {
  echo -e "${BLUE}${CONTROLLER_MSG}${RESET}"
  setup_controller_suffix
  curl ${CONTROLLER_GIST} > ${PREFIX}${WIDGET}.${CLIENT}
  replace_content ${CTRL_TEMP} ${controller_suffix} ${PREFIX}${WIDGET}.${CLIENT}
}

create_option_dir() {
  mkdir ${1}
  touch ${1}/${PREFIX}${WIDGET}.${2}
}

create_widget_dir() {
  make_core_dir ${WIDGET_DIR}
  curl ${TEMPLATE_GIST} > ${PREFIX}${WIDGET}.${HTML}
  touch ${PREFIX}${WIDGET}.${CSS}
  create_controller
  curl ${SERVER_GIST} > ${PREFIX}${WIDGET}.${SERVER}
  touch ${PREFIX}${WIDGET}.${LINK}
  touch ${PREFIX}${WIDGET}.${OPTION_SCHEMA}
}

display_help() {
  if [[ ${args[0]} == "-h" ]]; then
    less docs/help.md
    exit 0
  fi
}

fetch_github_user() {
  if [[ $(git config user.name) ]]; then
    echo $(git config user.name)
  else
    echo ${CONTRIB_TEMP}
  fi
}

flag_options() {
  echo -e "${BLUE}${START_MSG}${RESET}"
  for i in "${args[@]}"; do
    case $i in
    -a)
      is_angular_template=true
      ;;
    -s)
      is_script_include=true
      ;;
    -u)
      is_ui_script=true
      ;;
    esac
  done
}

format_data() {
  echo $(printf "%s" $1)
}

has_dashes() {
  if [[ ${args[0]} == *-* ]]; then
    name_has_dashes=true
  fi
}

main() {
  display_help
  flag_options
  trim_options
  set_widget_name
  branch_checkout
  create_base_dir
  has_dashes
  sub_base_content
  scaffold_option_dirs
  create_widget_dir
  make_commit
}

make_commit() {
  echo -e "${BLUE}${COMMIT_STATUS_MSG}${RESET}"
  cd ../../../
  git add ${SRC_DIR}/${PREFIX}${WIDGET}
  git commit -a -m "${COMMIT_MSG}"
  echo -e "${GREEN}${DONE_MSG}${RESET}"
}

make_core_dir() {
  if [ -d $1 ]; then
    cd $1
  else
    mkdir $1 && cd $1
  fi
}

make_space() {
  if [[ $1 ]]; then
    echo " "
  fi
}

make_uppercase() {
  echo $(tr '[:lower:]' '[:upper:]' <<< ${i:0:1})${i:1}"$(make_space $1)"
}

replace_content() {
  sed -i '' -e "s/${1}/${2}/g" ${3}
}

scaffold_option_dirs() {
  echo -e "${BLUE}${SUB_SCAFFOLD_MSG}${RESET}"
  if [[ ${is_angular_template} == true ]]; then
    create_option_dir ${ANGULAR_TEMPLATE_DIR} ${HTML}
  fi
  if [[ ${is_script_include} == true ]]; then
    create_option_dir ${SCRIPT_INCLUDE_DIR} ${SERVER}
  fi
  if [[ ${is_ui_script} == true ]]; then
    create_option_dir ${UI_SCRIPT_DIR} ${CLIENT}
  fi
}

setup_controller_suffix() {
  if [[ ${name_has_dashes} ]]; then
    local dash_name=()
    local in=${args[0]}
    IFS='-' read -ra input <<< "$in"
    for i in "${input[@]}"; do
      dash_name+=$(make_uppercase)
    done
    controller_suffix=$(format_data ${dash_name[@]})
  else
    local space_name=()
    for i in "${inputs[@]}"; do
      space_name+=$(make_uppercase)
    done
    controller_suffix=$(format_data ${space_name[@]})
  fi
}

set_widget_name() {
  local widget_dir=()
  for i in "${inputs[@]}"; do
    widget_dir+=$(echo -${i} | tr '[:upper:]' '[:lower:]')
    widget_name+=$(make_uppercase ${i})
  done
  WIDGET=$(format_data ${widget_dir[@]})
}

sub_base_content() {
  echo -e "${BLUE}${UPDATE_MSG}${RESET}"
  if [[ ${name_has_dashes} ]]; then
    local dash_readme=()
    rm=${widget_name}
    IFS='-' read -ra content <<< "$rm"
    for i in "${content[@]}"; do
      dash_readme+=$(make_uppercase ${i})
    done
    replace_content "${NAME_TEMP}" "${dash_readme%??}" README.md
    replace_content "${NAME_TEMP}" "${dash_readme%??}" config.json
  else
    replace_content "${NAME_TEMP}" "${widget_name%?}" README.md
    replace_content "${NAME_TEMP}" "${widget_name%?}" config.json
  fi
  replace_content "${CONTRIB_TEMP}" "$(fetch_github_user)" config.json
  replace_content "${DIR_TEMP}" "${PREFIX}${WIDGET}" config.json
  replace_content "${DIR_TEMP}" "${PREFIX}${WIDGET}" README.md
}

trim_options() {
  inputs=()
  for i in "${args[@]}"; do
    if [[ ${i} != "-a" && ${i} != "-s" && ${i} != "-u" ]]; then
      inputs+=("$i")
    fi
  done
}

args=($@)
main