namespace ExamService.Core.Features.Modules.Queries.Responses;

public class GetModuleByIdQueryResponse
{
    public int? AssignedCapacity { get; set; }
    public string Name { get; set; }
    public List<ModuleQuestions> Questions { get; set; }
}
