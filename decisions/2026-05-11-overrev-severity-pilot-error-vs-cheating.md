# Severity для overrev: pilot error → warn, cheating → violation

**Дата:** 2026-05-11
**Контекст:** M3 Stage C engine-passport — расширение моков incidents для отображения нарушений и pilot-error событий по мотору

## Контекст

В M2 в моках был только один overrev-инцидент (INC-004) — он сработал в контексте cheating-сессии SES-004 (CAN RPM 7500 vs Gen 9200) с severity=violation. На engine-passport я строил блок «Инциденты мотора», и пользователь указал что в реальной практике гоночных моторов **самое частое damage-event — overrev от mis-shift**, ошибки переключения передач: на разгоне (вместо V включена III) или на торможении (downshift в слишком низкую передачу). Кратковременные пики RPM за redline (~0.5-1 с). Это не cheating, это ошибка пилота.

Без отдельной классификации mis-shift overrev невозможно отличить от cheating-overrev в UI, и весь narrative прототипа («TMS защищает мотор от подмены данных») ломается: оператор видит «overrev» одинаковым и не понимает, кому претензии.

## Решение

Один и тот же `IncidentKind = 'overrev'`, разница в `IncidentSeverity`:

- **`severity: 'violation'`** — overrev в контексте cheating (CAN/Gen mismatch + redline пробит). Нарушение регламента TMS, материал для спора с клиентом.
- **`severity: 'warn'`** — mis-shift overrev. Ошибка пилота, не нарушение регламента. Возможный физический урон мотору, но в правовом смысле — pilot error, ответственность клиента-арендатора, не повод для штрафа со стороны TMS.

В `summary` текстом явно различается сценарий: «Превышение redline по Gen-каналу: 9200 при лимите 8800» (cheating) vs «Mis-shift на разгоне: вместо V включена III, кратковременный overrev 9100 об/мин (~0.6 с)» (pilot error).

Каскадное последствие: на UI `SeverityDot` автоматически даёт разный цвет (красный vs жёлтый) во всех местах, где инциденты показываются (fleet incidents panel, engine-passport incidents log, incidents screen, anti-cheat-replay summary, black-box block details). На filter-bar в `/demos/incidents` фильтр по severity работает как ожидаемо.

## Альтернативы

1. **Новый `IncidentKind = 'overrev-misshift'`.** Отвергнуто: размножает kinds для одной физической природы события (превышение redline). Существующее раcсуждение «kind = что произошло, severity = насколько серьёзно» остаётся консистентным.
2. **Новая `IncidentSeverity = 'damage'` для физических повреждений без регуляторного нарушения.** Отвергнуто: усложняет 3-уровневую палитру info/warn/violation, добавляет 4-й цвет в severity-палитру, требует синхронизации во всех каскадных компонентах. Текущие три уровня уже достаточно различимы.
3. **Не разделять — все overrev как warn (или все как violation).** Отвергнуто: в первом случае cheating-overrev выглядит безобидным; во втором mis-shift несправедливо помечает клиента как нарушителя.

## Последствия

- **Mock policy:** при добавлении нового overrev-инцидента всегда выбирать severity по контексту: есть ли в той же сессии cheating-нарушение? → violation. Сессия honest, но был mis-shift? → warn.
- **На anti-cheat-replay** mis-shift overrev на violation-сессиях (если такой будет) подсветится как warn-точка в IncidentSummary, отдельно от violation-overrev в той же сессии. Сейчас таких смешанных кейсов нет в моках, но архитектура их допускает.
- **Engine-passport narrative coherence:** при добавлении в `MAINTENANCE` записи об overhaul «после серии overrev-инцидентов» (как MNT-008 на ENG-009), нужно обеспечить наличие соответствующих warn-инцидентов на этом моторе в `INCIDENTS`. Иначе журналы расходятся.
- **При добавлении новых kinds** (например, `over-temp` с пилотской и cheating-разновидностью) — следовать тому же шаблону: один kind, разделение через severity и summary, не плодить kinds для контекста события.
