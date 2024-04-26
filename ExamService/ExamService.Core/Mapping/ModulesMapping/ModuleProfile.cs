using AutoMapper;

namespace ExamService.Core.Mapping.ModulesMapping;

public partial class ModuleProfile:Profile
{
    public ModuleProfile()
    {
        GetModulesByQuizIdMapping();
        GetModuleByIdMapping();
    }
}
