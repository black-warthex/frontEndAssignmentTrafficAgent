import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Assigment } from '../model/assigment';
import { ServiceAssigmentService } from './service-assigment.service';


describe('Service Assignment', () => {

  let httpTestingController: HttpTestingController;
  let service: ServiceAssigmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceAssigmentService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ServiceAssigmentService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('test get all list assignment', () => {
    it('returned Observable should match the right data', () => {
      const dummyListAssignment: Assigment[] = [];
      dummyListAssignment.push(
        {
          agentManagementId: 3112,
          agentCode: 'WTX-1',
          viaCode: 3257,
          dateAssignment: '2021-01-04',
          routeName: 'Calle 12'
        },
        {
          agentManagementId: 3113,
          agentCode: 'WTX-1',
          viaCode: 3257,
          dateAssignment: '2021-01-04',
          routeName: 'Calle 12'
        });

      service.getAssigments().subscribe(list => {
        expect(list.length).toEqual(2);
        expect(list).toEqual(dummyListAssignment);
      });

      const request = httpTestingController.expectOne(
        'http://localhost:8080/agentManagement/showAssignmentHistory'
      );

      expect(request.request.method).toBe('GET');

      request.flush(dummyListAssignment);

    });
  });

  describe('test search assignments ', () => {

    it('returned assignments find by route name from api via get', () => {

      const routName = 'Calle 54';
      const dummyListAssignment: Assigment[] = [];
      dummyListAssignment.push(
        {
          agentManagementId: 3112,
          agentCode: 'WTX-1',
          viaCode: 3257,
          dateAssignment: '2021-01-04',
          routeName: 'Calle 12'
        },
        {
          agentManagementId: 3113,
          agentCode: 'WTX-1',
          viaCode: 3257,
          dateAssignment: '2021-01-04',
          routeName: 'Calle 54'
        });

      service.findAssigmentByParam(routName).subscribe(data => {
        expect(JSON.stringify(data)).toEqual(JSON.stringify(dummyListAssignment[1]));
      });

      const request = httpTestingController.expectOne(
        'http://localhost:8080/agentManagement/searchAssignmentHistory/' + routName);
      expect(request.request.method).toBe('GET');
      request.flush(dummyListAssignment[1]);
    });

  });

  describe('test save assignment', () => {
    it('returned observable with request post', () => {
      const assignmentData: Assigment = {
        agentManagementId: 3113,
        agentCode: 'WTX-2',
        viaCode: 3257,
        dateAssignment: '2021-01-04',
        routeName: 'Calle 55'
      };

      service.saveAssignment(assignmentData).subscribe(res => {
        expect(assignmentData).toEqual(res);
      });

      const request = httpTestingController.expectOne(
        'http://localhost:8080/agentManagement/insertAssignment'
      );

      expect(request.request.method).toBe('POST');

      request.flush(assignmentData);

    });
  });

});
