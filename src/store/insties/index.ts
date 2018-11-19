export interface Campus {
  id: number;
  name: string;
}
export interface Institution {
  id: number;
  name: string;
  campuses: Campus[];
}
export interface InstiesState {
  insties: Institution[];
}

const instiesModule = {
  namespaced: true,
  state: {
    insties: [],
  },
};

export default instiesModule;
