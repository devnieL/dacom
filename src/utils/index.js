import objectPath from 'object-path';

export default {

  /**
   * Update specific properties on the state
   * using a certain path (e.g. "data.client.name")
   */
  updateState: (path, value, component) => {

    const {state} = component;
    const updatedState = JSON.parse(JSON.stringify(state));
    try{
      objectPath.set(updatedState, path, value);
      component.setState(updatedState);
    }catch(e){
      console.error(e);
    }

  }

}
