import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Agent } from 'src/app/model/agent';
import { ServiceAgentService } from 'src/app/Service/service-agent.service';

describe('Service Agent', () => {

  let httpTestingController: HttpTestingController;
  let service: ServiceAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceAgentService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ServiceAgentService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('test get list agents', () => {
    it('returned Observable should match the right data', () => {
      const dummyListAgents: Agent[] = [];
      dummyListAgents.push(
        {
          agentCode: 'WTX-1',
          agentName: 'Yonathan',
          agentSurname: 'Combita',
          agentYearsExperience: 1.3,
          agentSecretaryCode: 'ZA',
          agentViaCode: 1
        },
        {
          agentCode: 'WTX-2',
          agentName: 'Alexis',
          agentSurname: 'Montilla',
          agentYearsExperience: 1.1,
          agentSecretaryCode: 'GA',
          agentViaCode: 2
        });

      service.getAgents().subscribe(agents => {
        expect(agents.length).toEqual(2);
        expect(agents).toEqual(dummyListAgents);
      });

      const request = httpTestingController.expectOne(
        'http://localhost:8080/transitAgent/showListOfAgents'
      );

      request.flush(dummyListAgents);

    });
  });

  describe('test findById agent', () => {

    it('returned agent find by id WTX-1 from api via get', () => {

      const agentCode = 'WTX-1';
      const dummyListAgents: Agent[] = [];
      dummyListAgents.push(
        {
          agentCode: 'WTX-1',
          agentName: 'Yonathan',
          agentSurname: 'Combita',
          agentYearsExperience: 1.3,
          agentSecretaryCode: 'ZA',
          agentViaCode: 1
        },
        {
          agentCode: 'WTX-2',
          agentName: 'Alexis',
          agentSurname: 'Montilla',
          agentYearsExperience: 1.1,
          agentSecretaryCode: 'GA',
          agentViaCode: 2
        });

      service.getAgentById(agentCode).subscribe(dataAgent => {
        expect(dataAgent).toEqual(dummyListAgents[0]);
      });

      const request = httpTestingController.expectOne('http://localhost:8080/transitAgent/findTransitAgentById/' + agentCode);
      expect(request.request.method).toBe('GET');
      request.flush(dummyListAgents[0]);
    });

  });
  describe('test update agent', () => {

    it('returned Observable with resquest of update', () => {

      const agentData: Agent = {
        agentCode: 'WTX-1',
        agentName: 'Yonathan',
        agentSurname: 'Combita',
        agentYearsExperience: 1.3,
        agentSecretaryCode: 'ZA',
        agentViaCode: 1
      };

      service.updateAgent(agentData).subscribe(response => {

        expect(response.agentCode).toBe(agentData.agentCode);

      });

      const request = httpTestingController.expectOne(
        'http://localhost:8080/transitAgent/updateAgent'
      );

      expect(request.request.method).toBe('PUT');

      request.flush(agentData);

    });

  });

  describe('test delete agent', () => {

    it('returned observable with request delete', () => {

      const agentCode = 'WTX-1';

      service.deleteAgent(agentCode).subscribe(res => {
        expect(JSON.stringify(res)).toEqual('"WTX-1"');
      });

      const request = httpTestingController.expectOne(
        'http://localhost:8080/transitAgent/deleteAgent/WTX-1'
      );

      expect(request.request.method).toBe('DELETE');

      request.flush(agentCode);

    });

  });

  describe('test save agent', () => {
    it('returned observable with request post', () => {
      const agentData: Agent = {
        agentCode: 'WTX-1',
        agentName: 'Yonathan',
        agentSurname: 'Combita',
        agentYearsExperience: 1.3,
        agentSecretaryCode: 'ZA',
        agentViaCode: 1
      };

      service.saveAgent(agentData).subscribe(res => {
        expect(agentData).toEqual(res);
      });

      const request = httpTestingController.expectOne(
        'http://localhost:8080/transitAgent/insertAgent'
      );

      expect(request.request.method).toBe('POST');

      request.flush(agentData);

    });
  });

});
